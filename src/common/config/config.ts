export enum EnvironmentTypes {
  Production = 'production',
  Development = 'development',
  Staging = 'staging',
  Test = 'test',
  Local = 'local',
}

export default () => ({
  server: {
    host: process.env.API_ADDRESS || 'localhost',
    port: parseInt(process.env.API_PORT, 10) || 8000,
    environment: process.env.ENV || EnvironmentTypes.Local,
    memoryDebug: process.env.MEMORY_DEBUG || false,
  },
  postgres: {
    host: process.env.POSTGRES_HOST || 'localhost',
    port: +process.env.POSTGRES_PORT || 5432,
    username: process.env.POSTGRES_USER || 'postgres',
    database: process.env.POSTGRES_DATABASE || 'user-db',
    password: process.env.POSTGRES_PASSWORD || 'password',
  },
});
