// Type definitions for speakeasy 2.0
// Project: https://github.com/speakeasyjs/speakeasy
// Definitions by: Lucas Woo <https://github.com/legendecas>, Alexander Batukhtin <https://github.com/mrOlorin>, Aayush Kapoor <https://github.com/xeoneux>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/// <reference types="node" />

export type Encoding = "ascii" | "hex" | "base32" | "base64"
export type Algorithm = "sha1" | "sha256" | "sha512"

export interface SharedOptions {
	/**
	 * Key encoding, defaults to ascii
	 */
	encoding?: Encoding | undefined
	/**
	 * Algorithm, defaults to sha1
	 */
	algorithm?: Algorithm | undefined
}

export interface GeneratedSecret {
	/**
	 * ASCII representation of the secret
	 */
	ascii: string
	/**
	 * Hex representation of the secret
	 */
	hex: string
	/**
	 * Base32 representation of the secret
	 */
	base32: string
	/**
	 * URL for the QR code for the ASCII secret.
	 *
	 * @deprecated use a separate QR code library
	 */
	qr_code_ascii?: string | undefined
	/**
	 * URL for the QR code for the hex secret.
	 *
	 * @deprecated use a separate QR code library
	 */
	qr_code_hex?: string | undefined
	/**
	 * URL for the QR code for the base32 secret.
	 *
	 * @deprecated use a separate QR code library
	 */
	qr_code_base32?: string | undefined
	/**
	 * URL for the Google Authenticator otpauth
	 * URL's QR code.
	 *
	 * @deprecated use a separate QR code library
	 */
	google_auth_qr: string
	/**
	 * Google Authenticator-compatible otpauth URL.
	 */
	otpauth_url?: string | undefined
}
export interface GeneratedSecretWithOtpAuthUrl extends GeneratedSecret {
	/**
	 * Google Authenticator-compatible otpauth URL.
	 */
	otpauth_url: string
}

export interface DigestOptions extends SharedOptions {
	secret: string
	counter: number
	/**
	 * @deprecated use secret
	 */
	key?: string | undefined
}

export interface GenerateSecretOptions {
	/**
	 * Length of the secret, defaults to 32
	 */
	length?: number | undefined
	/**
	 * Whether to include symbols, defaults to false
	 */
	symbols?: boolean | undefined
	/**
	 * The name to use with Google Authenticator, deaults to 'SecretKey'
	 */
	name?: string | undefined
	/**
	 * Whether to output a Google Authenticator-compatible otpauth:// URL
	 * (only returns otpauth:// URL, no QR code), defaults to false
	 */
	otpauth_url?: boolean | undefined
	/**
	 * The provider or service with which the
	 * secret key is associated, defaults to ''
	 */
	issuer?: string | undefined
	/**
	 * Output QR code URLs for the token.
	 *
	 * @deprecated use your own QR code implementation to prevent
	 *   leaking of secret to a third party.
	 */
	qr_codes?: boolean | undefined
	/**
	 * Output a Google Authenticator otpauth:// QR code URL.
	 *
	 * @deprecated use your own QR code implementation to prevent
	 *   leaking of secret to a third party.
	 */
	google_auth_qr?: boolean | undefined
}
export interface GenerateSecretWithOtpAuthUrlOptions extends GenerateSecretOptions {
	/**
	 * Whether to output a Google Authenticator-compatible otpauth:// URL
	 * (only returns otpauth:// URL, no QR code), defaults to false
	 */
	otpauth_url: true
}

export interface HotpOptions extends DigestOptions {
	/**
	 * @deprecated use digits
	 */
	length?: number | undefined
	/**
	 * The number of digits for the one-time passcode, defaults to 6
	 */
	digits?: number | undefined
	/**
	 * The digest, automatically generated by default
	 */
	digest?: Buffer | undefined
}

export interface HotpVerifyOptions extends SharedOptions {
	/**
	 * Shared secret key
	 */
	secret: string
	/**
	 * Passcode to validate
	 */
	token: string
	/**
	 * Counter value. This should be stored by
	 * the application and must be incremented for each request.
	 */
	counter: number
	/**
	 * The number of digits for the one-time passcode, defaults to 6
	 */
	digits?: number | undefined
	/**
	 * The allowable margin for the counter.
	 * The function will check "W" codes in the future against the provided
	 * passcode, e.g. if W = 10, and C = 5, this function will check the
	 * passcode against all One Time Passcodes between 5 and 15, inclusive,
	 * defaults to 0
	 */
	window?: number | undefined
}

export interface TotpOptions extends SharedOptions {
	/**
	 * Time in seconds with which to calculate
	 * counter value, defaults to `Date.now() / 1000`.
	 */
	time?: number | undefined
	/**
	 * Time step in seconds, defaults to 30
	 */
	step?: number | undefined
	/**
	 * Initial time since the UNIX epoch from which to calculate the counter value,
	 * defaults to 0 (no offset).
	 */
	epoch?: number | undefined
	/**
	 * @deprecated use epoch
	 */
	initial_time?: number | undefined
	/**
	 * The number of digits for the one-time passcode, defaults to 6
	 */
	digits?: number | undefined
	/**
	 * @deprecated use digits
	 */
	length?: number | undefined
	/**
	 * The digest, automatically generated by default
	 */
	digest?: Buffer | undefined
	/**
	 * Shared secret key
	 */
	secret: string
	/**
	 * @deprecated use secret
	 */
	key?: string | undefined
	/**
	 * The counter value, calculated from time by default
	 */
	counter?: number | undefined
}

export interface TotpVerifyOptions extends SharedOptions {
	/**
	 * Shared secret key
	 */
	secret: string
	/**
	 * Passcode to validate
	 */
	token: string
	/**
	 * Time in seconds with which to calculate
	 * counter value, defaults to `Date.now() / 1000`.
	 */
	time?: number | undefined
	/**
	 * Time step in seconds, defaults to 30
	 */
	step?: number | undefined
	/**
	 * Initial time since the UNIX epoch from which to calculate the counter value,
	 * defaults to 0 (no offset).
	 */
	epoch?: number | undefined
	/**
	 * The number of digits for the one-time passcode, defaults to 6
	 */
	digits?: number | undefined
	/**
	 * The allowable margin for the counter.
	 * The function will check "W" codes in the future and the past against the
	 * provided passcode, e.g. if W = 5, and C = 1000, this function will check
	 * the passcode against all One Time Passcodes between 995 and 1005, inclusive
	 * defaults to 0
	 */
	window?: number | undefined
	/**
	 * The counter value, calculated from time by default
	 */
	counter?: number | undefined
}

export interface OtpauthURLOptions extends SharedOptions {
	/**
	 * Shared secret key
	 */
	secret: string
	/**
	 * Used to identify the account with which the secret key is associated,
	 * e.g. the user's email address.
	 */
	label: string
	/**
	 * Either 'hotp' or 'totp', defaults to 'totp'
	 */
	type?: "htop" | "totp" | undefined
	/**
	 * The initial counter value, required for HOTP.
	 */
	counter?: number | undefined
	/**
	 * The provider or service with which the secret key is associated.
	 */
	issuer?: string | undefined
	/**
	 * The number of digits for the one-time passcode. Currently ignored
	 * by Google Authenticator, defaults to 6
	 */
	digits?: number | undefined
	/**
	 * The length of time for which a TOTP code will be valid, in seconds.
	 * Currently ignored by Google Authenticator, defaults to 30
	 */
	period?: number | undefined
}

export interface Delta {
	delta: number
}

export interface Hotp {
	/**
	 * Generate a counter-based one-time token. Specify the key and counter, and
	 * receive the one-time password for that counter position as a string. You can
	 * also specify a token length, as well as the encoding (ASCII, hexadecimal, or
	 * base32) and the hashing algorithm to use (SHA1, SHA256, SHA512).
	 *
	 * @return The one-time passcode.
	 */
	(options: HotpOptions): string
	/**
	 * Verify a counter-based one-time token against the secret and return the delta.
	 * By default, it verifies the token at the given counter value, with no leeway
	 * (no look-ahead or look-behind). A token validated at the current counter value
	 * will have a delta of 0.
	 *
	 * You can specify a window to add more leeway to the verification process.
	 * Setting the window param will check for the token at the given counter value
	 * as well as `window` tokens ahead (one-sided window). See param for more info.
	 *
	 * `verifyDelta()` will return the delta between the counter value of the token
	 * and the given counter value. For example, if given a counter 5 and a window
	 * 10, `verifyDelta()` will look at tokens from 5 to 15, inclusive. If it finds
	 * it at counter position 7, it will return `{ delta: 2 }`.
	 *
	 * @return On success, returns an object with the counter
	 *   difference between the client and the server as the `delta` property (i.e.
	 *   `{ delta: 0 }`).
	 */
	verifyDelta: (options: HotpVerifyOptions) => undefined | Delta
	/**
	 * Verify a counter-based one-time token against the secret and return true if
	 * it verifies. Helper function for `hotp.verifyDelta()`` that returns a boolean
	 * instead of an object.
	 *
	 * @return Returns true if the token matches within the given window, false otherwise.
	 */
	verify: (options: HotpVerifyOptions) => boolean
}

export interface Totp {
	/**
	 * Generate a time-based one-time token. Specify the key, and receive the
	 * one-time password for that time as a string. By default, it uses the current
	 * time and a time step of 30 seconds, so there is a new token every 30 seconds.
	 * You may override the time step and epoch for custom timing. You can also
	 * specify a token length, as well as the encoding (ASCII, hexadecimal, or
	 * base32) and the hashing algorithm to use (SHA1, SHA256, SHA512).
	 *
	 * Under the hood, TOTP calculates the counter value by finding how many time
	 * steps have passed since the epoch, and calls HOTP with that counter value.
	 *
	 * @return The one-time passcode.
	 */
	(options: TotpOptions): string
	/**
	 * Verify a time-based one-time token against the secret and return the delta.
	 * By default, it verifies the token at the current time window, with no leeway
	 * (no look-ahead or look-behind). A token validated at the current time window
	 * will have a delta of 0.
	 *
	 * You can specify a window to add more leeway to the verification process.
	 * Setting the window param will check for the token at the given counter value
	 * as well as `window` tokens ahead and `window` tokens behind (two-sided
	 * window). See param for more info.
	 *
	 * `verifyDelta()` will return the delta between the counter value of the token
	 * and the given counter value. For example, if given a time at counter 1000 and
	 * a window of 5, `verifyDelta()` will look at tokens from 995 to 1005,
	 * inclusive. In other words, if the time-step is 30 seconds, it will look at
	 * tokens from 2.5 minutes ago to 2.5 minutes in the future, inclusive.
	 * If it finds it at counter position 1002, it will return `{ delta: 2 }`.
	 * If it finds it at counter position 997, it will return `{ delta: -3 }`.
	 *
	 * @return On success, returns an object with the time step
	 *   difference between the client and the server as the `delta` property (e.g.
	 *   `{ delta: 0 }`).
	 */
	verifyDelta: (options: TotpVerifyOptions) => undefined | Delta
	/**
	 * Verify a time-based one-time token against the secret and return true if it
	 * verifies. Helper function for verifyDelta() that returns a boolean instead of
	 * an object.
	 *
	 * @return Returns true if the token matches within the given
	 *   window, false otherwise.
	 */
	verify: (options: TotpVerifyOptions) => boolean
}

/**
 * Digest the one-time passcode options.
 *
 * @return The one-time passcode as a buffer.
 */
export function digest(options: DigestOptions): Buffer

export const hotp: Hotp
// Alias counter() for hotp()
export const counter: Hotp

export const totp: Totp
// Alias time() for totp()
export const time: Totp

/**
 * Generates a random secret with the set A-Z a-z 0-9 and symbols, of any length
 * (default 32). Returns the secret key in ASCII, hexadecimal, and base32 format,
 * along with the URL used for the QR code for Google Authenticator (an otpauth
 * URL). Use a QR code library to generate a QR code based on the Google
 * Authenticator URL to obtain a QR code you can scan into the app.
 */
export function generateSecret(options: GenerateSecretWithOtpAuthUrlOptions): GeneratedSecretWithOtpAuthUrl
/**
 * Generates a random secret with the set A-Z a-z 0-9 and symbols, of any length
 * (default 32). Returns the secret key in ASCII, hexadecimal, and base32 format,
 * along with the URL used for the QR code for Google Authenticator (an otpauth
 * URL). Use a QR code library to generate a QR code based on the Google
 * Authenticator URL to obtain a QR code you can scan into the app.
 */
export function generateSecret(options?: GenerateSecretOptions): GeneratedSecret
/**
 * @deprecated use generateSecret
 */
export const generate_key: typeof generateSecret

/**
 * Generates a key of a certain length (default 32) from A-Z, a-z, 0-9, and
 * symbols (if requested).
 *
 * @param  length  The length of the key, defaults to 32
 * @param  symbols Whether to include symbols in the key, defaults to false
 * @return The generated key.
 */
export function generateSecretASCII(length?: number, symbols?: boolean): string
/**
 * @deprecated use generateSecret
 */
export const generate_key_ascii: typeof generateSecretASCII

/**
 * Generate a Google Authenticator-compatible otpauth:// URL for passing the
 * secret to a mobile device to install the secret.
 *
 * Authenticator considers TOTP codes valid for 30 seconds. Additionally,
 * the app presents 6 digits codes to the user. According to the
 * documentation, the period and number of digits are currently ignored by
 * the app.
 *
 * To generate a suitable QR Code, pass the generated URL to a QR Code
 * generator, such as the `qr-image` module.
 *
 * @return A URL suitable for use with the Google Authenticator.
 * @see https://github.com/google/google-authenticator/wiki/Key-Uri-Format
 */
export function otpauthURL(options: OtpauthURLOptions): string