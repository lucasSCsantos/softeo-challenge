import supabase from '../lib/supabase';

// Está função determina se determinado elemento existe na tabela e se deve ser adicionado ou não, retorna o id do elemento criado ou encontrado
export default async (
  element: string | undefined,
  table: string,
  column: string
): Promise<string | null> => {
  if (element) {
    const { data } = await supabase
      .from(table)
      .select('id')
      .eq(column, element);

    if (data.length) {
      return data[0].id;
    }

    const response = await supabase
      .from(table)
      .insert([
        {
          [column]: element
        }
      ])
      .select('id');

    return response.data[0] ? response.data[0].id : undefined;
  }
  return null;
};
