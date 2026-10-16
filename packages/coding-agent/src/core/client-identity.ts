import type { ClientAttribution, ClientIdentity } from "@earendil-works/pi-ai";
import { VERSION } from "../config.ts";
import type { SettingsManager } from "./settings-manager.ts";
import { isInstallTelemetryEnabled } from "./telemetry.ts";

/**
 * Attribution sent while install telemetry is enabled. OpenRouter maps this to `HTTP-Referer`,
 * `X-OpenRouter-Title`, and `X-OpenRouter-Categories`. NVIDIA NIM and OpenCode use `name`.
 */
export const DIGEN_ATTRIBUTION: ClientAttribution = {
	name: "Digen AI",
	url: "https://agent.digen.ai",
	categories: ["cli-agent", "cloud-agent", "video-gen", "image-gen", "roleplay", "entertainment", "productivity"],
};

/**
 * How requests identify this app to providers: a detailed `User-Agent` with pi's version, and Digen attribution
 * while install telemetry is enabled.
 */
export function getClientIdentity(settingsManager: SettingsManager): ClientIdentity {
	return {
		userAgent: "detailed",
		version: VERSION,
		attribution: isInstallTelemetryEnabled(settingsManager) ? DIGEN_ATTRIBUTION : null,
	};
}
