import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';


class GroupEdit extends Component {

  emptyItem = {
    nome: '',
    endereco: '',
    cidade: '',
    estado: '',
    pais: '',
    telefone: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.id !== 'new') {
      const group = await (await fetch(`/api/pessoa/${this.props.match.params.id}`)).json();
      this.setState({item: group});
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    item[name] = value;
    this.setState({item});
  }

  async handleSubmit(event) {
    event.preventDefault();
    const {item} = this.state;

    await fetch('/api/pessoa' + (item.id ? '/' + item.id : ''), {
      method: (item.id) ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    });
    this.props.history.push('/pessoas');
  }

  render() {
    const {item} = this.state;
    const title = <h2>{item.id ? 'Editar Contato' : 'Adicionar Contato '}</h2>;

    return <div>
      
      <Container>
        {title}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="nome">Nome</Label>
            <Input type="text" name="nome" id="nome" value={item.nome || ''}
                   onChange={this.handleChange} autoComplete="nome"/>
          </FormGroup>
          <FormGroup>
            <Label for="endereco">Endereco</Label>
            <Input type="text" name="endereco" id="endereco" value={item.endereco || ''}
                   onChange={this.handleChange} autoComplete="address-level1"/>
          </FormGroup>
          <FormGroup>
            <Label for="cidade">Cidade</Label>
            <Input type="text" name="cidade" id="cidade" value={item.cidade || ''}
                   onChange={this.handleChange} autoComplete="address-level1"/>
          </FormGroup>
          <div className="row">
            <FormGroup className="col-md-4 mb-3">
              <Label for="estado">Estado</Label>
              <Input type="text" name="estado" id="estado" value={item.estado || ''}
                     onChange={this.handleChange} autoComplete="address-level1"/>
            </FormGroup>
            <FormGroup className="col-md-5 mb-3">
              <Label for="pais">País</Label>
              <Input type="text" name="pais" id="pais" value={item.pais || ''}
                     onChange={this.handleChange} autoComplete="address-level1"/>
            </FormGroup>
            <FormGroup className="col-md-3 mb-3">
              <Label for="telefone">Telefone</Label>
              <Input type="text" name="telefone" id="telefone" value={item.telefone || ''}
                     onChange={this.handleChange} autoComplete="address-level1"/>
            </FormGroup>
          </div>
          <FormGroup>
            <Button color="primary" type="submit">Salvar</Button>{' '}
            <Button color="secondary" tag={Link} to="/groups">Cancelar</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  }
}

export default withRouter(GroupEdit);
