import { Button, ButtonProps, Group } from '@mantine/core';
import { IconBrandDiscord, IconBrandGithub, IconBrandGoogle } from '@tabler/icons';
import { handleSignIn } from 'src/utils/auth';

export function GoogleButton(props: ButtonProps) {
  return (
    <Button
      leftIcon={<IconBrandGoogle size={16} />}
      sx={(theme) => ({
        backgroundColor: '#4267B2',
        color: '#fff',
        '&:hover': {
          backgroundColor: theme.fn.darken('#4267B2', 0.1),
        },
      })}
      variant="default"
      onClick={() => {
        handleSignIn('github');
      }}
      // color="gray"
      {...props}
    />
  );
}

export function DiscordButton(props: ButtonProps) {
  return (
    <Button
      leftIcon={<IconBrandDiscord size={16} />}
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? '#5865F2' : '#5865F2',
        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.fn.lighten('#5865F2', 0.05)
              : theme.fn.darken('#5865F2', 0.05),
        },
      })}
      onClick={() => handleSignIn('github')}
      {...props}
    />
  );
}

export function GithubButton(props: ButtonProps) {
  return (
    <Button
      {...props}
      leftIcon={<IconBrandGithub size={16} />}
      sx={(theme) => ({
        backgroundColor: theme.colors.dark[theme.colorScheme === 'dark' ? 9 : 6],
        color: '#fff',
        '&:hover': {
          backgroundColor: theme.colors.dark[theme.colorScheme === 'dark' ? 9 : 6],
        },
      })}
      onClick={() => {
        handleSignIn('github');
      }}
    />
  );
}

export function SocialButtons() {
  return (
    <Group position="center" sx={{ padding: 15 }}>
      <GoogleButton>Google</GoogleButton>
      <GithubButton>GitHub</GithubButton>
      <DiscordButton>Discord</DiscordButton>
    </Group>
  );
}
