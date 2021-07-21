package com.example.controle;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.Optional;

import com.example.modelo.Pessoa;
import com.example.modelo.PessoaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api")
public class ControleAgenda {
	private PessoaRepository pessoaRepository;
	public ControleAgenda(PessoaRepository pessoaRepository) {
		this.pessoaRepository = pessoaRepository;
	}

	@GetMapping("/pessoas") // mapeia HTTP get  para diretório /pessoas
	Collection<Pessoa> pessoas() {
		return pessoaRepository.findAll();
	}
	@PostMapping("/pessoa") // mapeia HTTP post  para diretório /pessoa
	ResponseEntity<Pessoa> createPessoa(@Valid @RequestBody Pessoa pessoa) throws URISyntaxException {
		//@Valid 
		//@RequestBody	mapeia requisicao http para dominio do objeto
		Pessoa result = pessoaRepository.save(pessoa);
		return ResponseEntity.created(new URI("/api/pessoa/" + result.getId()))
				.body(result); //response entity representa uma resposta http (codigo,status...)
	}
	@PutMapping("/pessoa/{id}") // mapeia HTTP put  para diretório /pessoas/pessoa.id
	ResponseEntity<Pessoa> updatePessoa(@Valid @RequestBody Pessoa pessoa) {

		Pessoa result = pessoaRepository.save(pessoa);
		return ResponseEntity.ok().body(result);
	}

	@GetMapping("/pessoa/{id}")// mapeia HTTP put  para diretório /pessoas/pessoa.id
	ResponseEntity<?> getPessoa(@PathVariable Long id) {
		Optional<Pessoa> pessoa = pessoaRepository.findById(id);
		return pessoa.map(response -> ResponseEntity.ok().body(response))
				.orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}
	@DeleteMapping("/pessoa/{id}")
	public ResponseEntity<?> deletePessoa(@PathVariable Long id) {

		pessoaRepository.deleteById(id);
		return ResponseEntity.ok().build();
	}
	


}
