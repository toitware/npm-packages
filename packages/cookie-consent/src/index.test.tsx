export {};

//TODO Jacob: Write tests. Currently, I have been able to make real tests, due to
//the never ending error:
//     1. You might have mismatching versions of React and the renderer (such as React DOM)
//     2. You might be breaking the Rules of Hooks
//     3. You might have more than one copy of React in the same app

test("two plus two is four", () => {
  expect(2 + 2).toBe(4);
});

// const mockTheme = createMuiTheme({});

// test("shows cookie consent properly", () => {
//   const result = render(
//     <CookieConsent
//       show={true}
//       callback={() => ""}
//       segmentKey="123"
//       cookieTheme={mockTheme}
//     />
//   );
//   expect(result.container).toMatchSnapshot();
// });
