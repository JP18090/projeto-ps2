package br.com.portalestagios.service;

import br.com.portalestagios.dto.RegisterEmpresaRequest;
import br.com.portalestagios.dto.RegisterEstudanteRequest;
import br.com.portalestagios.entity.*;
import br.com.portalestagios.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class RegisterService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private EstudanteRepository estudanteRepository;

    @Autowired
    private EmpresaRepository empresaRepository;

    @Autowired
    private AreaInteresseRepository areaInteresseRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional
    public Estudante registerEstudante(RegisterEstudanteRequest request) {
        if (usuarioRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email já cadastrado");
        }

        Usuario usuario = Usuario.builder()
                .nome(request.getNome())
                .email(request.getEmail())
                .senha(passwordEncoder.encode(request.getSenha()))
                .perfil("ESTUDANTE")
                .build();

        usuario = usuarioRepository.save(usuario);

        Set<AreaInteresse> areas = new HashSet<>();
        if (request.getInteresses() != null && !request.getInteresses().isEmpty()) {
            for (Long areaId : request.getInteresses()) {
                AreaInteresse area = areaInteresseRepository.findById(areaId)
                    .orElseThrow(() -> new IllegalArgumentException("Área de interesse não encontrada: " + areaId));
                areas.add(area);
            }
        }

        Estudante estudante = Estudante.builder()
                .usuario(usuario)
                .nome(request.getNome())
                .cpf(request.getCpf())
                .curso(request.getCurso())
                .email(request.getEmail())
                .telefone(request.getTelefone())
                .interesses(areas)
                .build();

        return estudanteRepository.save(estudante);
    }

    @Transactional
    public Empresa registerEmpresa(RegisterEmpresaRequest request) {
        if (usuarioRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email já cadastrado");
        }

        Usuario usuario = Usuario.builder()
                .nome(request.getNome())
                .email(request.getEmail())
                .senha(passwordEncoder.encode(request.getSenha()))
                .perfil("EMPRESA")
                .build();

        usuario = usuarioRepository.save(usuario);

        Set<AreaInteresse> areas = new HashSet<>();
        if (request.getAreasAtuacao() != null && !request.getAreasAtuacao().isEmpty()) {
            for (Long areaId : request.getAreasAtuacao()) {
                AreaInteresse area = areaInteresseRepository.findById(areaId)
                    .orElseThrow(() -> new IllegalArgumentException("Área de atuação não encontrada: " + areaId));
                areas.add(area);
            }
        }

        Empresa empresa = Empresa.builder()
                .usuario(usuario)
                .nome(request.getNome())
                .cnpj(request.getCnpj())
                .email(request.getEmail())
                .telefone(request.getTelefone())
                .endereco(request.getEndereco())
                .areasAtuacao(areas)
                .build();

        return empresaRepository.save(empresa);
    }
}
