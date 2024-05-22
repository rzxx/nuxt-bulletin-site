import * as crypto from 'crypto';

const algorithm = 'aes-256-cbc';
const keyBytes = 32; // 256 bits
const ivBytes = 16; // 128 bits

function passphraseToKey(passphrase: string): { key: Buffer; iv: Buffer } {
    const salt = crypto.createHash('sha256').update(passphrase).digest(); // derive salt from passphrase
    const passphraseBuffer = Buffer.from(passphrase, 'utf8');
    const derivedKey = crypto.pbkdf2Sync(passphraseBuffer, salt, 1000, keyBytes + ivBytes, 'sha256');

    const key = derivedKey.subarray(0, keyBytes);
    const iv = derivedKey.subarray(keyBytes, keyBytes + ivBytes);

    return { key, iv };
}

function encrypt(text: string, passphrase: string): string {
    try {
        const { key, iv } = passphraseToKey(passphrase);
        const cipher = crypto.createCipheriv(algorithm, key, iv);

        let encrypted = cipher.update(text, 'utf8', 'hex'); // 'utf8' for input encoding, 'hex' for output encoding
        encrypted += cipher.final('hex');

        // Return the encrypted data along with the IV
        return encrypted; // Include IV in the result
    } catch (e) {
        console.error('Encryption error:', e);
        return '';
    }
}

function decrypt(encryptedText: string, passphrase: string): string {
    try {
        const { key, iv} = passphraseToKey(passphrase);
        const decipher = crypto.createDecipheriv(algorithm, key, iv);

        let decrypted = decipher.update(encryptedText, 'hex', 'utf8'); // 'hex' for input encoding, 'utf8' for output decoding
        decrypted += decipher.final('utf8');

        return decrypted;
    } catch (e) {
        console.error('Decryption error:', e);
        return '';
    }
}

export { encrypt, decrypt };