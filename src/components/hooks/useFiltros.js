import { useState } from "react";

export const useFiltros = (initialValues = {}) => {
  const [filtros, setFiltros] = useState(initialValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFiltros((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (name, date) => {
    setFiltros((prev) => ({ ...prev, [name]: date }));
  };

  const resetFiltros = () => setFiltros(initialValues);

  const getQueryParams = () => {
    const params = { ...filtros };
    Object.keys(params).forEach((key) => {
      const val = params[key];
      if (val instanceof Date) {
        params[key] = val.toISOString().split("T")[0];
      }
    });
    return params;
  };

  return {
    filtros,
    setFiltros,
    handleInputChange,
    handleDateChange,
    resetFiltros,
    getQueryParams
  };
};