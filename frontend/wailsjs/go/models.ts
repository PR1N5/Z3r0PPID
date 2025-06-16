export namespace connections {
	
	export class Connection {
	    ID: number;
	    ip: string;
	    username: string;
	    hostname: string;
	    distribution: string;
	    // Go type: time
	    connectedAt: any;
	    state: string;
	    Conn: any;
	
	    static createFrom(source: any = {}) {
	        return new Connection(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.ID = source["ID"];
	        this.ip = source["ip"];
	        this.username = source["username"];
	        this.hostname = source["hostname"];
	        this.distribution = source["distribution"];
	        this.connectedAt = this.convertValues(source["connectedAt"], null);
	        this.state = source["state"];
	        this.Conn = source["Conn"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}

}

