package br.com.portalestagios.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.*;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        // Permitir frontend local e previews (Codespaces / app.github.dev).
        // Usamos addAllowedOriginPattern para aceitar padrões (útil para subdomínios do preview).
        config.addAllowedOriginPattern("http://localhost:3000");
        config.addAllowedOriginPattern("https://*.app.github.dev");
        config.addAllowedOriginPattern("https://*.codespaces.dev");
        config.addAllowedOriginPattern("https://github.dev");
        // Em ambiente de desenvolvimento, permitir qualquer origem também simplifica testes.
        config.addAllowedOriginPattern("*");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}