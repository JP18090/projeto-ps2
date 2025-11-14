package br.com.portalestagios.service;

import br.com.portalestagios.entity.Estudante;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Service
public class CurriculoService {

    public byte[] gerarCurriculoPDF(Estudante estudante) throws IOException {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();

        StringBuilder sb = new StringBuilder();
        sb.append("Currículo - ").append(estudante.getNome()).append("\n");
        sb.append("E-mail: ").append(estudante.getEmail()).append("\n");
        sb.append("Curso: ").append(estudante.getCurso()).append("\n");
        sb.append("Áreas de Interesse: ").append(estudante.getAreasInteresse()).append("\n\n");

        sb.append("Histórico de Candidaturas:\n");
        if (estudante.getHistoricoCandidaturas() != null) {
            for (String vaga : estudante.getHistoricoCandidaturas()) {
                sb.append("- ").append(vaga).append("\n");
            }
        }

        baos.write(sb.toString().getBytes(StandardCharsets.UTF_8));
        return baos.toByteArray();
    }
}
