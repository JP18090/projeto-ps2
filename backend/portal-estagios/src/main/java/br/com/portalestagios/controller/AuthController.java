package br.com.portalestagios.controller;

import br.com.portalestagios.dto.LoginResponse;
import br.com.portalestagios.entity.Empresa;
import br.com.portalestagios.entity.Estudante;
import br.com.portalestagios.entity.Usuario;
import br.com.portalestagios.repository.EmpresaRepository;
import br.com.portalestagios.repository.EstudanteRepository;
import br.com.portalestagios.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @Autowired
    private EstudanteRepository estudanteRepository;
    
    @Autowired
    private EmpresaRepository empresaRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String senha = body.get("senha");
        
        Optional<Usuario> usuarioOpt = usuarioRepository.findByEmail(email);
        
        if (usuarioOpt.isEmpty()) {
            return ResponseEntity.status(401).build();
        }
        
        Usuario usuario = usuarioOpt.get();
        
        if (!passwordEncoder.matches(senha, usuario.getSenha())) {
            return ResponseEntity.status(401).build();
        }
        
        LoginResponse.LoginResponseBuilder responseBuilder = LoginResponse.builder()
            .usuarioId(usuario.getId())
            .nome(usuario.getNome())
            .email(usuario.getEmail())
            .perfil(usuario.getPerfil());
        
        if ("ESTUDANTE".equals(usuario.getPerfil())) {
            Optional<Estudante> estudante = estudanteRepository.findByUsuario(usuario);
            estudante.ifPresent(e -> responseBuilder.estudanteId(e.getId()));
        } else if ("EMPRESA".equals(usuario.getPerfil())) {
            Optional<Empresa> empresa = empresaRepository.findByUsuario(usuario);
            empresa.ifPresent(e -> responseBuilder.empresaId(e.getId()));
        }
        
        return ResponseEntity.ok(responseBuilder.build());
    }
}