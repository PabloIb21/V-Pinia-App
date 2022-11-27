import { watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useQuery } from '@tanstack/vue-query';

import type { Client } from '@/clients/interfaces/client';
import clientsApi from '@/api/clients-api';
import { useClientsStore } from '@/store/clients';

const getClients = async(page: number): Promise<Client[]> => {
  // await new Promise(resolve => {
  //   setTimeout(() => resolve(true), 1500);
  // });

  const { data } = await clientsApi.get<Client[]>(`/clients?_page=${page}`);
  return data;
}

const useClients = () => {
  const store = useClientsStore();
  const { clients, currentPage, totalPages } = storeToRefs(store);

  const { isLoading, data } = useQuery(
    ['clients?page=', currentPage],
    () => getClients(currentPage.value),
    // {
    //   staleTime: 1000 * 60,
    // }
  );

  watch(data, clients => {
    if (clients) store.setClients(clients);
  }, { immediate: true });

  return {
    // Properties
    clients,
    currentPage,
    isLoading,
    totalPages,

    // Getters
    // totalPageNumbers: computed(
    //   () => [...new Array(totalPages.value)].map((v, i) => i + 1)
    // ),

    // Methods
    getPage(page: number) {
      store.setPage(page);
    },
  }
}

export default useClients;
