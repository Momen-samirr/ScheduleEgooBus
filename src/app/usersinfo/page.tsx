import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UsersWithComments from "@/components/UsersWithComments";
import UsersWithoutComments from "@/components/UsersWithoutComments";
import { CommandIcon } from "lucide-react";
import React from "react";

const UsersInfoRoute = () => {
  return (
    <div>
      <Tabs className="w-full" defaultValue="comments">
        <TabsList>
          <TabsTrigger
            value="comments"
            className="flex items-center gap-2 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary
              data-[state=active]:bg-transparent px-6 font-semibold"
          >
            <CommandIcon />
            Comments
          </TabsTrigger>
          <TabsTrigger
            value="noComments"
            className="flex items-center gap-2 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary
              data-[state=active]:bg-transparent px-6 font-semibold"
          >
            <CommandIcon />
            No Comments
          </TabsTrigger>
        </TabsList>
        <TabsContent value="comments" className="mt-6">
          <ScrollArea className="h-[calc(100vh-12rem)] w-full rounded-md border">
            <UsersWithComments />
          </ScrollArea>
        </TabsContent>
        <TabsContent value="noComments" className="mt-6">
          <ScrollArea className="h-[calc(100vh-12rem)] w-full rounded-md border">
            <UsersWithoutComments />
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UsersInfoRoute;
