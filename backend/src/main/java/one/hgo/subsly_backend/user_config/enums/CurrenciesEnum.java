package one.hgo.subsly_backend.userConfig.enums;

public enum CurrenciesEnum {
    EUR("EUR"),
    USD("USD"),
    GBP("GBP");

    private final String name;

    CurrenciesEnum(String name) {
        this.name = name;
    }
}
