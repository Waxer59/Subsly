package one.hgo.subsly_backend.auth.components;

import org.springframework.core.convert.converter.Converter;
import one.hgo.subsly_backend.auth.enums.PlatformEnum;
import org.springframework.stereotype.Component;

@Component
public class PlatformEnumConverter implements Converter<String, PlatformEnum> {

    @Override
    public PlatformEnum convert(String source) {
        return PlatformEnum.fromValue(source);
    }
}
