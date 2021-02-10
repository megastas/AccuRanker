import { gql, useQuery } from '@apollo/client';

const COUNTRIES = gql`
    query GetCountries  {
        countries {
            name
            code
            emoji
            continent {
                name
            }
        }
    }
`;

export default function useCountries() {
  const { data, loading, error } = useQuery(COUNTRIES);

  return {
    data: data ? data.countries?.map((i) => ({
      name: `${i.emoji} ${i.name}`,
      code: i.code,
      continent: i.continent?.name,
    })) : [],
    loading,
    error,
  };
}
