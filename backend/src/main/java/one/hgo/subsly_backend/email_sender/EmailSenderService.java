package one.hgo.subsly_backend.email_sender;

import com.resend.Resend;
import com.resend.core.exception.ResendException;
import com.resend.services.emails.model.CreateEmailOptions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

@Service
public class EmailSenderService {
    @Autowired
    private Resend resend;

    @Value("${resend.email}")
    private String senderEmail;

    public void sendOTPEmail(String receiverEmail, String otp) throws IOException, ResendException {
        String html = this.getEmailHtmlFromFile("otp-email");

        html = html.replace("{{OTP_CODE}}", otp);

        Map<String, String> headers = new HashMap<>();

        headers.put("X-Priority", "1");
        headers.put("Importance", "high");

        CreateEmailOptions params = CreateEmailOptions.builder()
                .from("Hgo <" + senderEmail + ">")
                .to(receiverEmail)
                .subject("Here is your OTP")
                .html(html)
                .headers(headers)
                .build();

        resend.emails().send(params);
    }

    private String getEmailHtmlFromFile(String htmlFileName) throws IOException {
        InputStream is = getClass().getClassLoader().getResourceAsStream("emails/" + htmlFileName + ".html");
        assert is != null;
        return new String(is.readAllBytes(), StandardCharsets.UTF_8);
    }
}
