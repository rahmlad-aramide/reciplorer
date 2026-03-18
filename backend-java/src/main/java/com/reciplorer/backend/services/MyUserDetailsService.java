package com.reciplorer.backend.services;

import com.reciplorer.backend.models.UserPrincipal;
import com.reciplorer.backend.models.Users;
import com.reciplorer.backend.repositories.UserRepositories;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService {
    private final UserRepositories userRepositories;

    public MyUserDetailsService(UserRepositories userRepositories) {
        this.userRepositories = userRepositories;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Users user = userRepositories.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException(username));
        return new UserPrincipal(user);
    }
}
