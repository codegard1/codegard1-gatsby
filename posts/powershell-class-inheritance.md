---
tags:
  - powershell
published: false
date: 2020-04-16T22:15:52.555Z
title: PowerShell Class Inheritance
---
PowerShell classes support inheritance, which allows you to create a base class and methods that are then automatically available to inheritor classes. 

### Parent Class

```powershell
class Rock {
    # Properties
    [String]$Size
    [Float]$Weight
    [Bool]$IsShiny

    # Constructor 
    Rock( [Size]$Size, [Weight]$Weight, [IsShiny]$IsShiny ){
        $This.Size = $Size
        $This.Weight = $Weight
        $This.IsShiny = $IsShiny
    }
}
```

### Inheritor class

Inheritance is signaled by `: ParentClassName` in the class signature. The inheritor will be able to access properties and methods of its parent. 

```powershell
class Pebble : Rock {
    [Int]$SmoothnessIndex

    [Bool]IsSmoothAndHeavy(){
        If( $This.Weight -gt 5 -and $This.SmoothnessIndex -gt 0.87 ){
            Return $True;
        } else {
            Return $False;
        }
    }
}

$Pebster = [Pebble]::new()
```
