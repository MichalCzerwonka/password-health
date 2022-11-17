import Login from "~/components/Login/Login";
import userEvent from "@testing-library/user-event";
import * as ReactRouterDom from 'react-router-dom';
import { render, screen } from "~/jest/testUtils";
import fetchMock from "jest-fetch-mock";
import { Routes } from "~/constants";

const historyPushMock = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom') as typeof ReactRouterDom,
  useHistory: () => ({
    push: historyPushMock
  }),
}));

const setup = () => render(<Login />)

describe('Login Page', () => {

  test('should render correctly', async () => {
    setup();
    expect(screen.getByTestId('login-form')).toBeVisible();
  })

  test('should be able to submit form with success', async () => {
    fetchMock.mockResponse(JSON.stringify({
      id: "1",
      email: "user@user.com",
      token: "tokentokentoken"
    }))

    setup();

    const userName = screen.getByTestId('login-form-username')
    const password = screen.getByTestId('login-form-password')
    const submit = screen.getByTestId('login-form-submit')

    await userEvent.type(userName, "correctUser");
    await userEvent.type(password, "correctPassword");

    await userEvent.click(submit);

    expect(historyPushMock).toBeCalledWith(Routes.PasswordHealth)
  })

  test('should be able to submit form but login failed', async () => {
    setup();

    fetchMock.mockReject()

    const userName = screen.getByTestId('login-form-username')
    const password = screen.getByTestId('login-form-password')
    const submit = screen.getByTestId('login-form-submit')

    await userEvent.type(userName, "incorrectUser");
    await userEvent.type(password, "incorrectPassword");

    await userEvent.click(submit);

    expect(await screen.findByTestId('error-block')).toBeVisible();
  })
});
