# Z3r0PPID
C2 for manage the connections of rev-shells. Project made with Wails + React.

## Build instructions (Linux -> Windows)
For compiling the file in Linux for Windows, we need to make a new Docker:

```bash
docker build -t wails-cross -f Dockerfile.wails-cross .
```

Now we can compile in the Docker:

```bash
docker run --rm -v "$PWD":/app -w /app wails-cross wails build -platform windows/amd64 -skipbindings
```