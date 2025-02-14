import React from "react";
import { Button } from "../ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";

const Job1 = () => {
  return (
    <div>
      <p>3 days ago</p>
      <Button variant="outline" className="rounded-full" size="icon">
        <Bookmark />
      </Button>
      <Button className="p-6" size="icon" variant="outline">
        <Avatar>
          <AvatarImage src="https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?ga=GA1.1.941833367.1739497364&semt=ais_hybrid"></AvatarImage>
        </Avatar>
      </Button>
    </div>
  );
};

export default Job1;
