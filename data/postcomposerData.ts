import {
  Image as ImageIcon,
  Smile,
  Link,
  MapPin,
  Settings2,
} from "lucide-react";

import { IconActionPlugin } from "@/types/home/composer-type";

export const getComposerAction = (composer: any): IconActionPlugin[] => [
  {
    name: "file",
    icon: ImageIcon,
    action: () => document.getElementById("fileUpload")?.click(),
  },
  {
    name: "poll",
    icon: Settings2,
    action: () => composer.togglePoll(),
  },
  {
    name: "emoji",
    icon: Smile,
    action: () => composer.setShowEmoji((prev: boolean) => !prev),
  },
  {
    name: "link",
    icon: Link,
    action: () => composer.toggleLink(),
  },
  {
    name: "location",
    icon: MapPin,
    action: () => console.log("Add location"),
  },
];