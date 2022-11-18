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

  test('should render correctly', () => {
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

    const userNameInput = screen.getByTestId('login-form-username')
    const passwordInput = screen.getByTestId('login-form-password')
    const submitBtn = screen.getByTestId('login-form-submit')

    await userEvent.type(userNameInput, 'correctUser');
    await userEvent.type(passwordInput, 'correctPassword');

    await userEvent.click(submitBtn);

    expect(historyPushMock).toBeCalledWith(Routes.PasswordHealth)
  })

  test('should be able to submit form but login failed', async () => {
    setup();

    fetchMock.mockReject()

    const userNameInput = screen.getByTestId('login-form-username')
    const passwordInput = screen.getByTestId('login-form-password')
    const submitBtn = screen.getByTestId('login-form-submit')

    await userEvent.type(userNameInput, 'incorrectUser');
    await userEvent.type(passwordInput, 'incorrectPassword');

    await userEvent.click(submitBtn);

    expect(await screen.findByTestId('error-block')).toBeVisible();
  })
});
