import {
  Image as ImageIcon,
  Smile,
  Calendar,
  MapPin,
  BarChart2,
} from "lucide-react";

import { ComposerPlugin } from "@/types/home/composerplugin";

export const getToolbarIcons = (composer: any): ComposerPlugin[] => [
  {
    name: "file",
    icon: ImageIcon,
    action: () => document.getElementById("fileUpload")?.click(),
  },
  {
    name: "poll",
    icon: BarChart2,
    action: () => console.log("Open poll creator"),
  },
  {
    name: "emoji",
    icon: Smile,
    action: () => composer.setShowEmoji((prev: boolean) => !prev),
  },
  {
    name: "schedule",
    icon: Calendar,
    action: () => console.log("Open scheduler"),
  },
  {
    name: "location",
    icon: MapPin,
    action: () => console.log("Add location"),
  },
];