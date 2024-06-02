const dotenv = require('dotenv');

dotenv.config({
  path: `./.config/.env.${process.env.ENV}`,
});

const seedEnv = process.env.ENV ? 'ts' : 'js';
const seeders = [
  `src/database/seeds/create-test.seed.${seedEnv}`,
  `src/database/seeds/create-2021station.seeds.${seedEnv}`,
];

module.exports = {
  type: process.env.postgres_type,
  host: process.env.postgres_host,
  port: process.env.postgres_port,
  username: process.env.postgres_user,
  password: process.env.postgres_password,
  database: process.env.postgres_database,
  synchronize: false,
  logging: false,
  entities: [
    // "src/database/entity/**/*.ts"
    process.env.ENV
      ? 'src/database/entity/**/*.ts'
      : 'dist/database/entity/**/*.js',
  ],
  migrations: [
    // "src/database/migrations/**/*.ts"
    process.env.ENV
      ? 'src/database/migrations/**/*.ts'
      : 'dist/database/migrations/**/*.js',
  ],
  seeds: seeders,
  subscribers: ['src/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'src/database/entity',
    migrationsDir: 'src/database/migrations',
    subscribersDir: 'src/database/subscriber',
  },
};
