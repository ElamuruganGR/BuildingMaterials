package com.building.materials.configuration;

/*import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;*/

//@EnableWebSecurity
public class SpringSecurityConfiguration {
//        extends WebSecurityConfigurerAdapter {

   /* private static final Logger logger = LogManager.getLogger(SpringSecurityConfiguration.class);
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        logger.info("SpringSecurityConfiguration.configure");
        auth.inMemoryAuthentication()
                .withUser("greva")
                .password("qwerty@123")
                .roles("USER");
    }

    @Bean
    public PasswordEncoder getPasswordEncoder(){
        logger.info("SpringSecurityConfiguration.getPasswordEncoder");
        return NoOpPasswordEncoder.getInstance();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        System.out.println("SpringSecurityConfiguration");
        http.authorizeRequests()
                .antMatchers("/admin").hasRole("ADMIN")
                .antMatchers("/user").hasAnyRole("ADMIN", "USER")
                .antMatchers("/todaysCost").hasAnyRole("ADMIN", "USER")
                .and()
                .formLogin();
    }*/
}
