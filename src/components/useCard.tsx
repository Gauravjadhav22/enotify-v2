import React from 'react';
import { Card, CardContent, CardHeader, CardTitle,CardDescription,CardFooter } from "@/components/ui/card"


const UserCard = () => {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>User Information</CardTitle>
        <CardDescription>Details about the user account</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span>Instance</span>
            <span className="font-medium text-gray-700">Not connected</span>
          </div>
          <div className="flex justify-between">
            <span>Instance ID</span>
            <span className="font-medium text-gray-700">cm3opczl5gpclcx78nbbzdl0h</span>
          </div>
          <div className="flex justify-between">
            <span>Remaining Credits</span>
            <span className="font-medium text-green-600">4999</span>
          </div>
          <div className="flex justify-between">
            <span>Credits Usage</span>
            <span className="font-medium text-gray-700">1</span>
          </div>
          <div className="flex justify-between">
            <span>Expiry Date</span>
            <span className="font-medium text-gray-700">15 Nov 2025</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="space-y-2 w-full">
          <div className="flex justify-between">
            <span>Profile Number</span>
            <span className="font-medium text-gray-700">Not connected</span>
          </div>
          <div className="flex justify-between">
            <span>Webhook</span>
            <span className="font-medium text-red-600">Disabled</span>
          </div>
          <div className="flex justify-between">
            <span>Chatbot</span>
            <span className="font-medium text-red-600">Disabled</span>
          </div>
          <div className="flex justify-between">
            <span>Scan WhatsApp</span>
            <span className="font-medium text-gray-700">Test Message</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default UserCard;
