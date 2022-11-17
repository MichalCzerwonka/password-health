import { render, screen } from "~/jest/testUtils";
import List from "~/components/PasswordHealth/components/List/List";
import { IItem } from "~/services/getUserItems";
import { ITEMS_MOCK, SINGLE_ITEM } from "~/components/__tests__/__mocks__/items";
import userEvent from "@testing-library/user-event";
import updateItem from "~/services/updateItem";

jest.mock('~/services/updateItem');

const setup = (items: IItem[] = []) => render(
  <div id="app">
    <List items={items} />
  </div>
)

describe('List component', () => {
  test('should render list without items', () => {
    setup([]);

    expect(screen.getByTestId('list')).toBeVisible();
    expect(screen.queryByTestId('list-item')).toBeNull();
  })

  test(`should render list with all ${ITEMS_MOCK.length} items`, () => {
    setup(ITEMS_MOCK);

    const items = screen.getAllByTestId('list-item');

    expect(screen.getByTestId('list')).toBeVisible();
    expect(items).toHaveLength(ITEMS_MOCK.length)
  })

  test('should be able to open and close modal', async () => {
    setup(SINGLE_ITEM);

    const updateBtn = screen.getByTestId('update-modal-open');

    await userEvent.click(updateBtn);

    const title = await screen.findByTestId('update-modal-title');

    expect(title).toBeVisible();
    expect(title).toHaveTextContent('Update Password');

    const cancelBtn = screen.getByTestId('update-modal-cancel');

    await userEvent.click(cancelBtn);

    expect(title).not.toBeVisible();
  })

  test('should be able change a password with success', async () => {
    setup(SINGLE_ITEM);
    const newPassword = 'correctPassword12$%';

    const updateBtn = screen.getByTestId('update-modal-open');

    await userEvent.click(updateBtn);

    const title = await screen.findByTestId('update-modal-title');
    const passwordInput = screen.getByTestId('update-modal-password');
    const submitBtn = screen.getByTestId('update-modal-submit');

    await userEvent.type(passwordInput, newPassword);

    await userEvent.click(submitBtn);

    expect(updateItem).toBeCalledWith({ ...SINGLE_ITEM[0], password: newPassword })

    expect(title).not.toBeVisible();
  })
});
