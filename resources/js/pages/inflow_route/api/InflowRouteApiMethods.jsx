export const getInflowRoutes = async (params, setInflows, setLinks, setPaginate) => {
  axios.get('/api/v1/management/inflow-routes', params)
  .then((response) => {
    const inflow_routes = response.data.inflow_routes;
    const newData = inflow_routes.data.map(v => ({
      id: v.id,
      name: v.name,
      uri: "https://liff.line.me/1660723896-RmovvEYY?path=inflow-route/" + v.key,
      count: v.count
    }))
    setInflows(newData);
    setLinks([...Array(inflow_routes.last_page)].map((_, i) => i + 1))
    setPaginate({
      current_page: inflow_routes.current_page, 
      per_page: inflow_routes.per_page,
      from: inflow_routes.from,
      to: inflow_routes.to,
      total: inflow_routes.total,
    })
  })
  .catch(error => {
      console.error(error);
  },);
};