import { computed, ref, watch } from 'vue';
import { useMutation, useQuery } from '@tanstack/vue-query';

import type { Client } from '@/clients/interfaces/client';
import clientsApi from '@/api/clients-api';

// const queryClient = useQueryClient();

const getClient = async(id: number): Promise<Client> => {
  // await new Promise(resolve => {
  //   setTimeout(() => resolve(true), 2500);
  // });

  const { data } = await clientsApi.get(`/clients/${id}`);
  return data;
}

const updateClient = async(client: Client): Promise<Client> => {
  const { data } = await clientsApi.patch<Client>(`/clients/${client.id}`, client);

  // const queries = queryClient.getQueryCache().findAll(['clients?=page'], { exact: false });
  // queries.forEach(query => query.fetch());

  return data;
}

const useClient = (id: number) => {

  const client = ref<Client>();

  const { isLoading, data, isError } = useQuery(
    ['client', id],
    () => getClient(id),
    { retry: false }
  );

  const clientMutation = useMutation(updateClient);

  watch(data, () => {
    if (data.value)
      client.value = {...data.value};
  }, { immediate: true });

  watch(clientMutation.isSuccess, () => {
    setTimeout(() => {
      clientMutation.reset();
    }, 2000);
  }, { immediate: true });

  return {
    client,
    isError,
    isLoading,

    // Methods
    isErrorUpdating: computed(() => clientMutation.isError.value),
    isUpdating: computed(() => clientMutation.isLoading.value),
    isUpdatingSuccess: computed(() => clientMutation.isSuccess.value),
    updateClient: clientMutation.mutate,
  }
}

export default useClient;
