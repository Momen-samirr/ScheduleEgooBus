import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
const UnAuthenticatedmobileSidebar = () => {
  return (
    <div className="sticky top-20">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold">
            Welcome Back!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground mb-4">
            Login to access your profile and connect with others.
          </p>
          <LoginLink>
            <Button className="w-full" variant="outline">
              Login
            </Button>
          </LoginLink>
          <RegisterLink>
            <Button className="w-full mt-2" variant="default">
              Sign Up
            </Button>
          </RegisterLink>
        </CardContent>
      </Card>
    </div>
  );
};

export default UnAuthenticatedmobileSidebar;
