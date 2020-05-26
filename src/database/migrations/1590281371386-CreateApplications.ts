import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateApplications1590281371386
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'applications',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'id_candidate',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'id_vacancies',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'applications',
      new TableForeignKey({
        name: 'ApplicationsCandidate',
        columnNames: ['id_candidate'],
        referencedColumnNames: ['id'],
        referencedTableName: 'candidate',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'applications',
      new TableForeignKey({
        name: 'ApplicationsVacancies',
        columnNames: ['id_vacancies'],
        referencedColumnNames: ['id'],
        referencedTableName: 'vacancies',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('applications');
  }
}
