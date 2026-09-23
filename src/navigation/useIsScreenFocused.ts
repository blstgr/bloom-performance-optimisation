import { NavigationContext } from '@react-navigation/native';
import React from 'react';

/**
 * Whether the screen calling this is the one currently on screen.
 *
 * `TabNavigator` sets `detachInactiveScreens={false}`, so every tab screen stays mounted once
 * visited and its effects keep running in the background. Any effect that *navigates* therefore
 * has to check it is the focused screen first — otherwise a screen the user cannot see will move
 * them somewhere else. That is not hypothetical: unfavoriting a plant from its article used to
 * close the article, because the still-mounted FavoritesScreen noticed its list had emptied and
 * redirected.
 *
 * Reads `NavigationContext` directly rather than calling `useIsFocused`, which throws when there
 * is no navigator above it. A screen rendered on its own — in a test, or any preview harness —
 * should render rather than crash, so a missing navigator is treated as focused.
 */
export function useIsScreenFocused() {
  const navigation = React.useContext(NavigationContext);
  const [isFocused, setIsFocused] = React.useState(() => navigation?.isFocused() ?? true);

  React.useEffect(() => {
    if (!navigation) return;

    setIsFocused(navigation.isFocused());
    const unsubscribeFocus = navigation.addListener('focus', () => setIsFocused(true));
    const unsubscribeBlur = navigation.addListener('blur', () => setIsFocused(false));

    return () => {
      unsubscribeFocus();
      unsubscribeBlur();
    };
  }, [navigation]);

  return isFocused;
}
