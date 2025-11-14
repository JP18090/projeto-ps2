package br.com.portalestagios.service;

import br.com.portalestagios.dao.EmpresaDAO;
import br.com.portalestagios.entity.Empresa;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class EmpresaService {
    private final EmpresaDAO dao;

    public EmpresaService(EmpresaDAO dao) {
        this.dao = dao;
    }

    public List<Empresa> listar() { return dao.listar(); }
    public Empresa salvar(Empresa e) { return dao.salvar(e); }
    public void excluir(Long id) { dao.excluir(id); }
}
