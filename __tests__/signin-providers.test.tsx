import { authClient } from "@/lib/auth-client";
import "@testing-library/jest-dom/vitest";
import { screen, waitFor } from "@testing-library/react";
import { toast } from "sonner";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { SignInCredentialsAndMagicLinkForm } from "../app/auth/signin/sign-in-credentials-and-magic-link-form";
import { SignInProviders } from "../app/auth/signin/sign-in-providers";
import { setup } from "../test/setup";

// Mock next/navigation
vi.mock("next/navigation", async () => {
  const actual = await vi.importActual("next/navigation");
  return {
    ...actual,
    useSearchParams: () => new URLSearchParams(),
  };
});

describe("SignInCredentialsAndMagicLinkForm", () => {
  beforeEach(() => {
    vi.resetAllMocks();

    // Set default localStorage state for sign-in-with-credentials
    window.localStorage.setItem("sign-in-with-credentials", "true");

    // Mock window.location
    Object.defineProperty(window, "location", {
      value: {
        origin: "http://localhost:3000",
        href: "http://localhost:3000/auth/signin",
      },
      writable: true,
    });

    // Mock successful responses for auth methods
    vi.mocked(authClient.signIn.email).mockResolvedValue({
      data: { success: true },
      error: null,
    });

    vi.mocked(authClient.signIn.magicLink).mockResolvedValue({
      data: { success: true },
      error: null,
    });
  });

  it("should render email and password fields in credentials mode", async () => {
    setup(<SignInCredentialsAndMagicLinkForm />);

    // Email field should always be present
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();

    // Password field should be visible in credentials mode
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();

    // Submit button should say "Sign in"
    expect(
      screen.getByRole("button", { name: /sign in$/i }),
    ).toBeInTheDocument();

    // Should have a link to switch to magic link
    expect(screen.getByText(/login with magic link/i)).toBeInTheDocument();
  });

  it("should switch to magic link mode when clicking the link", async () => {
    const { user } = setup(<SignInCredentialsAndMagicLinkForm />);

    // Initially in credentials mode
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();

    // Click to switch to magic link mode
    await user.click(screen.getByText(/login with magic link/i));

    // Password field should not be visible anymore
    expect(screen.queryByLabelText(/password/i)).not.toBeInTheDocument();

    // Submit button text should change
    expect(
      screen.getByRole("button", { name: /sign in with magic link/i }),
    ).toBeInTheDocument();

    // Should have a link to switch back to credentials mode
    expect(screen.getByText(/use password/i)).toBeInTheDocument();
  });

  it("should submit with credentials and redirect on success", async () => {
    const { user } = setup(
      <SignInCredentialsAndMagicLinkForm callbackUrl="/dashboard" />,
    );

    // Fill in the form
    await user.type(screen.getByLabelText(/email/i), "test@example.com");
    await user.type(screen.getByLabelText(/password/i), "password123");

    // Submit the form
    await user.click(screen.getByRole("button", { name: /sign in$/i }));

    // Check if auth client was called with correct params
    await waitFor(() => {
      expect(authClient.signIn.email).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
        rememberMe: true,
      });
    });

    // Check if redirect happened
    expect(window.location.href).toBe("http://localhost:3000/dashboard");
  });

  it("should submit with magic link and redirect to verify page", async () => {
    const { user } = setup(<SignInCredentialsAndMagicLinkForm />);

    // Switch to magic link mode
    await user.click(screen.getByText(/login with magic link/i));

    // Fill in the form
    await user.type(screen.getByLabelText(/email/i), "test@example.com");

    // Submit the form
    await user.click(
      screen.getByRole("button", { name: /sign in with magic link/i }),
    );

    // Check if auth client was called with correct params
    await waitFor(() => {
      expect(authClient.signIn.magicLink).toHaveBeenCalledWith({
        email: "test@example.com",
        callbackURL: undefined,
      });
    });

    // Check if redirect happened to verify page
    expect(window.location.href).toBe("http://localhost:3000/auth/verify");
  });

  it("should show error message on failed sign in", async () => {
    // Mock error response
    vi.mocked(authClient.signIn.email).mockResolvedValue({
      data: null,
      error: new Error("Invalid credentials"),
    });

    const { user } = setup(<SignInCredentialsAndMagicLinkForm />);

    // Fill in the form
    await user.type(screen.getByLabelText(/email/i), "test@example.com");
    await user.type(screen.getByLabelText(/password/i), "wrong-password");

    // Submit the form
    await user.click(screen.getByRole("button", { name: /sign in$/i }));

    // Should call the auth client
    await waitFor(() => {
      expect(authClient.signIn.email).toHaveBeenCalled();
    });

    // Check if toast.error was called
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Invalid credentials");
    });
  });
});

// Test social provider buttons
describe("SignInProvidersContainer", () => {
  it("should render GitHub button when enabled", async () => {
    setup(<SignInProviders providers={["github"]} />);

    expect(screen.getByRole("button", { name: /github/i })).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /google/i }),
    ).not.toBeInTheDocument();
  });

  it("should render Google button when enabled", async () => {
    setup(<SignInProviders providers={["google"]} />);

    expect(screen.getByRole("button", { name: /google/i })).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /github/i }),
    ).not.toBeInTheDocument();
  });

  it("should render both buttons when both are enabled", async () => {
    setup(<SignInProviders providers={["github", "google"]} />);

    expect(screen.getByRole("button", { name: /github/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /google/i })).toBeInTheDocument();
  });
});
