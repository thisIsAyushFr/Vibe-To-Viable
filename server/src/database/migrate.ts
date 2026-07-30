import { readFileSync } from 'fs';
import path from 'path';
import { query, closePool } from './connection.js';

const runMigrations = async () => {
  try {
    console.log('\n========================================');
    console.log('  CareSync Database Migration');
    console.log('========================================\n');

    // Read schema.sql
    const schemaPath = path.resolve('./src/database/schema.sql');
    const schemaSql = readFileSync(schemaPath, 'utf-8');

    console.log('🔄 Executing schema...');

    // Execute schema
    await query(schemaSql);

    console.log('✓ Schema created successfully');
    console.log('✓ All tables created');
    console.log('✓ All indexes created');
    console.log('\n========================================');
    console.log('  Migration Complete');
    console.log('========================================\n');

  } catch (error) {
    console.error('❌ Migration failed:', error instanceof Error ? error.message : error);
    process.exit(1);
  } finally {
    await closePool();
  }
};

runMigrations();
