import { fireEvent, render, screen } from "@testing-library/react";
import Modal from "../../components/formulario/Modal";

describe("Test del componente Modal", () => {
  // 1.- Se prueba si el modal tiene como titulo el parametro que enviamos
  test("Este test debe dar correcto", () => {
    const titulo = "Prueba de Modal";
    const children = "Contenido de Modal";

    render(<Modal titulo={titulo}>{children}</Modal>);
    const linkElement = screen.getByText(/prueba/i);
    expect(linkElement).toBeInTheDocument();
  });
  // 2.- Se prueba si el modal no cuenta con un titulo
  test("Este test debe dar incorrecto", () => {
    const children = "Contenido de Modal";

    render(<Modal>{children}</Modal>);
    const linkElement = screen.getByText(/prueba/i);
    expect(linkElement).toBeInTheDocument();
  });
  // 3.- Se prueba si en el modal se ingresan correctamente la función para el botón "SI"
  test("Este test de funciones cuando el usuario presiona 'SI', debe salir correcto", () => {
    const mockHandler = jest.fn();
    const children = "Contenido de Modal";
    const component = render(<Modal onClickSi={mockHandler}>{children}</Modal>);
    const botonSI = component.getByText(/si/i);
    fireEvent.click(botonSI);
    expect(mockHandler.mock.calls).toHaveLength(1);
  });
  // 4.- Se prueba si en el modal se ingresan correctamente la función para el botón "No"
  test("Este test de funciones cuando el usuario presiona 'No', debe salir correcto", () => {
    const mockHandler = jest.fn();
    const children = "Contenido de Modal";
    const component = render(<Modal onClickNo={mockHandler}>{children}</Modal>);
    const botonNo = component.getByText(/no/i);
    fireEvent.click(botonNo);
    expect(mockHandler.mock.calls).toHaveLength(1);
  });
});
