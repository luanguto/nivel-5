import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import Head from 'next/head';
import { Menu } from '../../componentes/Menu';
import { Livro } from '../../classes/modelo/Livros';
import { LinhaLivro } from '../../componentes/LinhaLivro';
import { ControleLivros } from '../../classes/Controle/ControleLivros'; 

const controleLivros = new ControleLivros();

const LivroLista = () => {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [carregado, setCarregado] = useState(false);

  const excluir = (codigo: string) => {
    controleLivros.excluir(codigo).then(() => setCarregado(false));
  }

  useEffect(() => {
    if (!carregado) {
      controleLivros.obterLivros().then((livrosObtidos) => {
        setLivros(livrosObtidos);
        setCarregado(true);
      });
    }
  }, [carregado]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Catálogo de Livros</title>
      </Head>
      <Menu />
      <main className={styles.main}>
        <div className='container justify-content-center'>
          <h1 className={styles.title}>Catálogo de Livros</h1>
          <table className='table table-striped table-bordered table-hover'>
            <thead className="thead-dark">
              <tr>
                <th className='bg-dark text-white'>Título</th>
                <th className='bg-dark text-white'>Resumo</th>
                <th className='bg-dark text-white'>Editora</th>
                <th className='bg-dark text-white'>Autores</th>
              </tr>
            </thead>
            <tbody>
              {livros.map((livro, index) => (
                <LinhaLivro
                  key={index}
                  livro={livro}
                  excluir={() => excluir(livro._id)}
                />
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}

export default LivroLista;
