package one.hgo.subsly_backend.auth.enums;

import java.util.Arrays;

public enum PlatformEnum {
    WEB("web"),
    CHROME_EXTENSION("chrome_extension");

    private final String name;

    PlatformEnum(String name) {
        this.name = name;
    }

    public static PlatformEnum fromValue(String value) {
        return Arrays.stream(values())
                .filter(s -> s.name.equalsIgnoreCase(value))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Invalid status"));
    }
}
