package one.hgo.subsly_backend.user_config.enums;

public enum CurrenciesEnum {
    EUR("EUR"),
    USD("USD"),
    GBP("GBP");

    private final String name;

    CurrenciesEnum(String name) {
        this.name = name;
    }
}
