import { DB } from "@/demo/AbsurdDb";

//JS Version of Cryptography method in NorthWindAPI.NET
class CryptoDemo {

    async make_hash(input, salt) {
        const encoder = new TextEncoder();
        const keyMaterial = await window.crypto.subtle.importKey(
            "raw", 
            encoder.encode(input),
            "PBKDF2",
            false,
            ["deriveKey"]
        );

        const key = await window.crypto.subtle.deriveKey(
            {
                name: "PBKDF2",
                salt: encoder.encode(salt),
                iterations: 50000,
                hash: "SHA-256"
            },
            keyMaterial,
            { name: "HMAC", hash: "SHA-256", length: 32 },
            false,
            ["sign"]
        );
        
        const hash = await window.crypto.subtle.exportKey("raw", key);
        return new Uint8Array(hash);
    }


    async check_hash(pwd, hashString) {
        const segments = hashString.split(":");
        const hash = segments[0];
        const salt = segments[1];

        const hashed = await this.make_hash(pwd, salt);
        return hashed.every((val, index) => val === hash[index]);
    }

    async authenticate(usr, pwd) {
        try {
            let auth =  {
                authorizedUser: {
                    employeeId: -1,
                    userName: "",
                    firstName: "",
                    lastName: "",
                    roleId: -1,
                    roleName: "",
                },
                token: ""
            }
            let result = await DB.query(`SELECT * FROM Auth WHERE Username = ${usr} LIMIT 1`);

            if(result == null) {
                return auth;
            } else if (result.hash == null) {
                return auth;
            } else if (this.check_hash(pwd, result.hash)) {
                auth.authorizedUser.employeeId = result.employeeId;
                auth.authorizedUser.roleId = result.roleId;
                return auth;
            }

            return auth;

        } catch (e) {
            console.error("Error getting user:", e);
        }
    }
}

export const AuthManager = new CryptoDemo();