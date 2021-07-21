import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';

import { Link } from 'react-router-dom';

class GroupList extends Component {

  constructor(props) {
    super(props);
    this.state = {groups: [], isLoading: true};
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('api/pessoas')
      .then(response => response.json())
      .then(data => this.setState({groups: data, isLoading: false}));
  }

  async remove(id) {
    await fetch(`/api/pessoa/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedGroups = [...this.state.groups].filter(i => i.id !== id);
      this.setState({groups: updatedGroups});
    });
  }

  render() {
    const {groups, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const groupList = groups.map(group => {
      const address = `${group.endereco || ''} ${group.cidade || ''} ${group.estado || ''} ${group.pais || ''}`;
      return <tr key={group.id}>
        <td style={{whiteSpace: 'nowrap'}}>{group.nome}</td>
        <td>{address}</td>
        <td>{group.telefone}</td>

        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/pessoas/" + group.id}>Editar</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(group.id)}>Remover</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>
        
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/pessoas/new">Adicionar Contato</Button>
          </div>
          <h3>Minha Lista de Contatos</h3>
          <Table className="mt-4">
            <thead>
            <tr>
              <th width="20%">Nome</th>
              <th width="20%">Endereço</th>
              <th width="60%">Telefone</th>
            </tr>
            </thead>
            <tbody>
            {groupList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default GroupList;
