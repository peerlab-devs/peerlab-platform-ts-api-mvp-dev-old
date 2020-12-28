import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateUsers1609114221871 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    /** Cria extensao para geracao de uuid se nao existe */
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    /** Cria tabela de usuarios */
    await queryRunner.createTable(
      /** Cria nova tabela */
      new Table({
        /** Nome da tabela */
        name: 'users',
        /** Colunas da tabela */
        columns: [
          /** Primeira coluna */
          {
            /** Nome de uma coluna */
            name: 'id',
            /** Tipo da coluna */
            type: 'uuid',
            /** Chave primaria: (true | false) */
            isPrimary: true,
            /** Define como uuid (mais recomendado, inclusive por segurança) */
            generationStrategy: 'uuid',
            /** Define geração automática de id */
            default: 'uuid_generate_v4()',
          },
          /** Outra coluna */
          {
            name: 'name',
            type: 'varchar',
            /** Pode ser nulo? (true | false) (o padrão já é false) */
            isNullable: false,
          },
          /** Outra coluna */
          {
            name: 'email',
            /** Define tipo timestamp com timezone */
            type: 'varchar',
            /** Define que valor deve ser único naquela coluna da tabela */
            isUnique: true,
            isNullable: false,
          },
          /** Outra coluna */
          {
            name: 'password_hash',
            /** Define tipo timestamp com timezone */
            type: 'varchar',
          },
          /** Outra coluna */
          {
            name: 'created_at',
            type: 'timestamp',
            /** Valor default deve ser o timestamp de agora */
            default: 'now()',
          },
          /** Outra coluna */
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    /** Deleta tabela */
    await queryRunner.dropTable('users');
  }
}
