'use client';

import { Button } from "@/components/ui/button";
import { FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { FieldErrors, useFieldArray, useForm } from "react-hook-form";

type Monster = {
  name: string;
  attack: number;
  defense: number;
  hp: number;
  skills: {
    name: string;
    power: number;
  }[];
};

export default function MonsterForm() {
  const {toast} = useToast();
  const {
    register,
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Monster>({
    defaultValues: {
      name: '',
      attack: 1,
      defense: 1,
      hp: 1,
      skills: [{
        name: '',
        power: 1,
      }],
    }
  });

  const { fields, append, remove } = useFieldArray({
    name: 'skills',
    control,
  });

  const onSubmit = async (data: Monster) => {
    console.log(data);
    toast({
      title: 'create',
      description: `${data.name} created`,
    })
  }
  
  const handleError = (data: FieldErrors) => {
    console.log(data);
  }

  return (
    <div className="container py-4">
      <form
        onSubmit={handleSubmit(onSubmit, handleError)}
        className="space-y-3"
      >
        <FormItem>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            {...register("name", {
              required: "input name",
              maxLength: { value: 20, message: "under 20" },
            })}
            type="text"
            autoComplete="off"
          />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
        </FormItem>
        <FormItem>
          <Label htmlFor="attack">Attack</Label>
          <Input
            id="attack"
            {...register("attack", {
              required: "input",
              min: {
                value: 1,
                message: "over 1",
              },
              max: {
                value: 100,
                message: "under 100",
              },
            })}
            type="number"
          />
          {errors.attack && (
            <span className="text-red-500">{errors.attack.message}</span>
          )}
        </FormItem>
        <FormItem>
          <Label htmlFor="defense">defense</Label>
          <Input
            id="defense"
            {...register("defense", {
              required: "input",
              min: {
                value: 1,
                message: "over 1",
              },
              max: {
                value: 100,
                message: "under 100",
              },
            })}
            type="number"
          />
          {errors.defense && (
            <span className="text-red-500">{errors.defense.message}</span>
          )}
        </FormItem>
        <FormItem>
          <Label htmlFor="hp">Hp</Label>
          <Input
            id="hp"
            {...register("hp", {
              required: "input",
              min: {
                value: 1,
                message: "over 1",
              },
              max: {
                value: 100,
                message: "under 100",
              },
            })}
            type="number"
          />
          {errors.hp && (
            <span className="text-red-500">{errors.hp.message}</span>
          )}
        </FormItem>

        <h2>power</h2>

        {fields.map((field, index) => (
          <div key={field.id} className="space-y-3 p-4 border rounded">
            <FormItem>
              <Label htmlFor="list">List</Label>
              <Input id="list" {...register(`skills.${index}.name`)} />
            </FormItem>
            <FormItem>
              <Label htmlFor="power">power</Label>
              <Input id="power" {...register(`skills.${index}.power`)} />
            </FormItem>
            {fields.length > 1 && (
              <Button type="button" onClick={() => remove(index)}>
                delete
              </Button>
            )}
          </div>
        ))}

        <Button
          onClick={() =>
            append({
              name: "",
              power: 1,
            })
          }
          variant="outline"
          type="button"
        >
          add
        </Button>

        <div className="flex gap-3">
          <Button>Create</Button>
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              reset();
            }}
          >
            reset
          </Button>
        </div>
      </form>
    </div>
  );
};
