import { Column, ColumnType, Index, IndexedColumn, Schema, Table } from '@journeyapps/powersync-sdk-web';

export const USER_PROFILES_TABLE = 'user_profiles';
export const JOURNAL_ENTRIES_TABLE = 'journal_entries';
export const USER_SHARES_TABLE = 'user_shares';

export const AppSchema = new Schema([
  new Table({
    name: JOURNAL_ENTRIES_TABLE,
    columns: [
      new Column({ name: 'created_at', type: ColumnType.TEXT }),
      new Column({ name: 'photo', type: ColumnType.TEXT }),
      new Column({ name: 'note', type: ColumnType.TEXT }),
      new Column({ name: 'location', type: ColumnType.TEXT }),
      new Column({ name: 'rating', type: ColumnType.INTEGER }),
      new Column({ name: 'private_note', type: ColumnType.TEXT }),
      new Column({ name: 'owner_id', type: ColumnType.TEXT })
    ]
  }),
  new Table({
    name: USER_PROFILES_TABLE,
    columns: [
      new Column({ name: 'name', type: ColumnType.TEXT }),
      new Column({ name: 'photo', type: ColumnType.TEXT }),
      new Column({ name: 'owner_id', type: ColumnType.TEXT })
    ]
  }),
  new Table({
    name: USER_SHARES_TABLE,
    columns: [
      new Column({ name: 'owner_id', type: ColumnType.TEXT }),
      new Column({ name: 'user_id', type: ColumnType.TEXT }) 
    ]
  })
]);
