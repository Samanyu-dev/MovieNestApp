//
//  CircleBackground.swift
//  MovieNest
//
//  Created by Samanyu on 25/02/25.
//

import SwiftUI

struct CircleBackground: View {
    var color: Color
    
    var body: some View {
        Circle()
            .fill(color)
            .frame(width: 300, height: 300)
    }
}
