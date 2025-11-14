package br.com.portalestagios.config;

import br.com.portalestagios.entity.*;
import br.com.portalestagios.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class DataLoader implements CommandLineRunner {

    private final UsuarioRepository usuarioRepository;
    private final EmpresaRepository empresaRepository;
    private final EstudanteRepository estudanteRepository;
    private final AreaInteresseRepository areaRepository;
    private final VagaRepository vagaRepository;

    @Override
    public void run(String... args) {
        if (usuarioRepository.count() == 0) {
            // Usuários
            Usuario empresaUser = usuarioRepository.save(
                Usuario.builder().nome("Empresa XPTO").email("empresa@xpto.com").senha("123").perfil("EMPRESA").build()
            );
            Usuario estudanteUser = usuarioRepository.save(
                Usuario.builder().nome("João da Silva").email("joao@email.com").senha("123").perfil("ESTUDANTE").build()
            );

            // Áreas
            AreaInteresse ti = areaRepository.save(AreaInteresse.builder().nome("Tecnologia da Informação").build());
            AreaInteresse adm = areaRepository.save(AreaInteresse.builder().nome("Administração").build());

            // Empresa
            Empresa empresa = empresaRepository.save(Empresa.builder()
                    .usuario(empresaUser)
                    .nome("Empresa XPTO")
                    .cnpj("12.345.678/0001-99")
                    .email("empresa@xpto.com")
                    .telefone("(11) 99999-9999")
                    .endereco("Rua das Flores, 123")
                    .build());

            // Estudante
            Estudante estudante = estudanteRepository.save(Estudante.builder()
                    .usuario(estudanteUser)
                    .nome("João da Silva")
                    .cpf("123.456.789-00")
                    .curso("Ciência da Computação")
                    .email("joao@email.com")
                    .telefone("(11) 98888-8888")
                    .build());

            // Vaga
            vagaRepository.save(Vaga.builder()
                    .titulo("Estágio em TI")
                    .descricao("Auxiliar em desenvolvimento de software.")
                    .localizacao("São Paulo - SP")
                    .modalidade("Presencial")
                    .cargaHoraria("30h/semana")
                    .requisitos("Conhecimentos em Java e SQL")
                    .empresa(empresa)
                    .area(ti)
                    .build());

            System.out.println("✅ Mock de dados criado com sucesso!");
        }
    }
}
