package com.ajuarez.quizbackend.mapper;

import com.ajuarez.quizbackend.dto.auth.AuthenticationRequestDto;
import com.ajuarez.quizbackend.dto.auth.AuthenticationResponseDto;
import com.ajuarez.quizbackend.model.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User toUser(AuthenticationRequestDto dto);
    AuthenticationResponseDto toAuthenticationResponse(User user);
}
