package one.hgo.subsly_backend.users.enums;

public enum DeleteUserState {
    SEND_OTP("SEND_OTP"),
    SUCCESS("SUCCESS"),
    FAILURE("FAILURE");

    private final String name;

    DeleteUserState(String name) {
        this.name = name;
    }
}
